#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
let input, output, percent = 20;

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "-o": case "--output": output = args[++i]; break;
    case "-p": case "--percent": percent = parseFloat(args[++i]); break;
    case "-h": case "--help": usage(); process.exit(0);
    default: if (!input) input = args[i]; break;
  }
}

function usage() {
  console.log(`Usage: node extend-svg.js <input.svg> [-o output.svg] [-p percent]

  Extend SVG paths so that drawSVG "P% 100%" shows the original full stroke.

  <input.svg>       Input SVG file
  -o, --output      Output file (default: overwrite input)
  -p, --percent     drawSVG start percentage (default: 20)

  Example:
    node extend-svg.js icon.svg -p 20
    node extend-svg.js icon.svg -o icon-extended.svg -p 30`);
}

if (!input) { usage(); process.exit(1); }
if (!output) output = input;

const round = (n) => Math.round(n * 100) / 100;

function tokenize(d) {
  return d.match(/[MmLlHhVvZzCcSsQqTtAa]|[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || [];
}

function parse(d) {
  const tokens = tokenize(d);
  const cmds = [];
  let i = 0;
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) {
      const cmd = tokens[i++];
      const nums = [];
      while (i < tokens.length && !/^[A-Za-z]$/.test(tokens[i])) {
        nums.push(parseFloat(tokens[i++]));
      }
      cmds.push({ cmd, args: nums });
    } else {
      i++;
    }
  }
  return cmds;
}

function extendPath(d, pct) {
  const cmds = parse(d);
  if (cmds.length < 2 || cmds[0].cmd !== "M") return d;

  const sx = cmds[0].args[0], sy = cmds[0].args[1];
  let x = sx, y = sy;

  const segs = [];
  for (let i = 1; i < cmds.length; i++) {
    const { cmd, args } = cmds[i];
    const before = { x, y };
    let len = 0;
    switch (cmd) {
      case "h": len = Math.abs(args[0]); x += args[0]; break;
      case "H": len = Math.abs(args[0] - x); x = args[0]; break;
      case "v": len = Math.abs(args[0]); y += args[0]; break;
      case "V": len = Math.abs(args[0] - y); y = args[0]; break;
      case "z": case "Z":
        len = Math.hypot(sx - x, sy - y);
        x = sx; y = sy;
        break;
      default:
        return d;
    }
    segs.push({ cmd, args, len, before });
  }

  const total = segs.reduce((s, seg) => s + seg.len, 0);
  if (total === 0) return d;

  const ext = total * pct / (100 - pct);
  const first = segs[0];
  let nx = sx, ny = sy, dir = 1;

  switch (first.cmd) {
    case "h": dir = Math.sign(first.args[0]); nx = sx - dir * ext; break;
    case "H": dir = Math.sign(first.args[0] - sx); nx = sx - dir * ext; break;
    case "v": dir = Math.sign(first.args[0]); ny = sy - dir * ext; break;
    case "V": dir = Math.sign(first.args[0] - sy); ny = sy - dir * ext; break;
  }

  const parts = [`M${round(nx)} ${round(ny)}`];

  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];

    if (i === 0) {
      switch (seg.cmd) {
        case "h": parts.push(`h${round(seg.args[0] + dir * ext)}`); break;
        case "H": parts.push(`H${seg.args[0]}`); break;
        case "v": parts.push(`v${round(seg.args[0] + dir * ext)}`); break;
        case "V": parts.push(`V${seg.args[0]}`); break;
      }
    } else if (seg.cmd === "z" || seg.cmd === "Z") {
      const bx = seg.before.x, by = seg.before.y;
      if (Math.abs(bx - sx) < 0.01) parts.push(`V${round(sy)}`);
      else if (Math.abs(by - sy) < 0.01) parts.push(`H${round(sx)}`);
      else parts.push(`L${round(sx)} ${round(sy)}`);
    } else {
      parts.push(`${seg.cmd}${seg.args[0]}`);
    }
  }

  return parts.join("");
}

let svg = fs.readFileSync(input, "utf-8");
let count = 0;

svg = svg.replace(/(<path[^>]*?\bd=")([^"]+)(")/g, (_, pre, d, suf) => {
  const extended = extendPath(d, percent);
  if (extended !== d) count++;
  return pre + extended + suf;
});

fs.writeFileSync(output, svg, "utf-8");
console.log(`Done: ${count} paths extended for drawSVG "${percent}% 100%" → ${output}`);
