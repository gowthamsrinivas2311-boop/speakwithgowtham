import sys
import re

log_file = sys.argv[1]
output_file = sys.argv[2]

with open(log_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

out_lines = []
capturing = False
for line in lines:
    if line.startswith("1: <!DOCTYPE html>"):
        capturing = True
    
    if capturing:
        if line.startswith("The above content shows the entire"):
            break
        # Match pattern like "123: <html>" and extract "<html>"
        match = re.match(r"^\d+:\s?(.*)\n?", line)
        if match:
            out_lines.append(match.group(1))
        else:
            out_lines.append(line.strip('\n'))

with open(output_file, "w", encoding="utf-8") as f:
    for out in out_lines:
        f.write(out + "\n")

print(f"Recovered {len(out_lines)} lines to {output_file}")
