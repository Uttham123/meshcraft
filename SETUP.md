# MeshCraft — Team Onboarding Guide

Get Claude building MESH DS Figma screens correctly in under 15 minutes.

---

## Who can use this and what does it cost?

| Role | Figma license needed | Claude license | Cost to team |
|------|---------------------|----------------|--------------|
| **Designer** | Already have one ✅ | Personal or team Claude account | Free — no extra seat |
| **PM / Engineer** | Not required | Personal or team Claude account | Use shared service account (see below) |

Designers on the team already have Figma licenses that grant access to the MESH Library and the Sandbox file. MeshCraft uses your existing Figma access — it does not require a separate Figma seat or plugin purchase.

---

## What you need before starting

- [ ] macOS (Apple Silicon or Intel)
- [ ] A Figma account with access to the Meesho org
- [ ] Claude Code CLI installed (`npm install -g @anthropic/claude-code` or download from claude.ai/code)
- [ ] Mier B02 font installed on your machine (get from the internal font repo — DM&B Slack channel)
- [ ] Git installed (`git --version` to confirm)

---

## Setup — Designers (full access path)

### Step 1 — Clone the MeshCraft repo

```bash
git clone https://github.com/Uttham123/meshcraft.git
cd meshcraft
```

This gives you:
- `CLAUDE.md` — Claude's standing instructions for all MESH DS work
- `.claude/commands/meshcraft.md` — the `/meshcraft` slash command
- `mesh-component-keys.md` — every MESH Library variant key
- `mesh-layer-map.json` — layer → T2 token bindings
- `mesh-font-fixer/` — local Figma plugin for Mier B02 conversion

### Step 2 — Generate your Figma personal access token

1. Open Figma → click your avatar (top-left) → **Settings**
2. Scroll to **Personal access tokens** → **Generate new token**
3. Name it `meshcraft-claude`, set expiry to **No expiration** (or your team policy)
4. **Copy the token immediately** — you won't see it again
5. Required scopes: **File content** (read) + **Variables** (read/write)

> Keep this token private. Do not commit it to any repo.

### Step 3 — Configure the Figma MCP server in Claude Code

Open (or create) `~/.claude/claude_desktop_config.json` and add:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

Replace `YOUR_TOKEN_HERE` with the token you generated in Step 2.

Restart Claude Code after saving. Confirm the MCP is connected — you should see **figma** listed when you run `/mcp` inside a Claude Code session.

### Step 4 — Install the `/meshcraft` slash command globally

The `/meshcraft` command lives in `.claude/commands/` inside the repo. Claude Code only loads project-scoped commands when launched from that exact folder. Copy it to your user-level commands directory so it's available in **every** Claude Code session regardless of where you open it:

```bash
mkdir -p ~/.claude/commands
cp meshcraft/.claude/commands/meshcraft.md ~/.claude/commands/
```

Restart Claude Code — you should now see `/meshcraft` in the command list.

### Step 5 — Install the MESH Font Fixer local plugin in Figma

This plugin converts DM Sans → Mier B02 across the whole file. The Claude MCP runs in Figma's cloud context where only Google Fonts are available, so text is authored in DM Sans and this plugin fixes it in one click.

1. In Figma Desktop: **Plugins → Development → Import plugin from manifest...**
2. Navigate to `meshcraft/mesh-font-fixer/manifest.json` → **Open**
3. The plugin now appears under **Plugins → Development → MESH Font Fixer**

Run it once after any Claude-generated screen to convert fonts across the whole file.

### Step 6 — Get file access

Request access to both files from your design lead or Figma admin:

| File | File key | Purpose |
|------|----------|---------|
| MESH Library | `i2MPgsD7m0EUVJ9MbaFyZH` | Published component library — Claude imports from here |
| Sandbox | `u6xWbRPNRJgem7EwDrKfqr` | Working file — T1/T2 variables live here, screens are built here |

Access level required: **can view** on MESH Library, **can edit** on Sandbox.

### Step 7 — Verify everything works

Open a Claude Code session from inside the `meshcraft/` directory:

```bash
cd meshcraft
claude
```

Then type:

```
/meshcraft

Build a quick test: Appbar (Back type) at y=0, one Solid Jamun button at y=80, one Neutral badge at y=140. Place everything in a 390×300 frame called "MeshCraft Test" at x=2000, y=100 in the Sandbox file.
```

If you see the frame appear in Figma with components imported and T2 tokens bound, setup is complete. Run Font Fixer to finish.

---

## Setup — Non-designers (shared service account path)

PMs and engineers who need to generate Figma screens but don't have a Figma seat can use a shared Meesho design-ops service account.

### What the service account provides

- A Figma viewer seat (can place components and bind variables via API, cannot manually edit)
- A shared Figma personal access token stored in 1Password under **Design Ops / MeshCraft Service Token**
- Access to MESH Library (view) and Sandbox (edit via API)

### Steps for non-designers

1. **Clone the repo** (same as Step 1 above)

2. **Get the shared token** from 1Password — vault: **Design Ops**, item: **MeshCraft Service Token**
   - If you don't have vault access, ping the design-ops Slack channel (#design-ops)

3. **Configure the MCP** (same as Step 3 above, using the shared token)

4. **Do not** install Font Fixer or request personal Figma access — the service account handles all API operations and a designer reviews and finalises the output

5. When your screen is generated, tag a designer in the Figma file to run Font Fixer and do a final QA pass

> **Note for design leads:** The shared token has write access to Sandbox only. It cannot publish components, modify the MESH Library, or access other org files.

---

## Troubleshooting

### "Component with key X not found"

The MESH Library must be connected to your Sandbox file.

1. In Figma: **Main menu → Libraries** (book icon in toolbar)
2. Find **MESH Library** and toggle it **on** for the Sandbox file
3. Re-run the Claude script — `importComponentByKeyAsync` will now resolve

If the library is already connected and keys still fail, the component may have been republished with a new key. Check `mesh-demand-index.md` for the ⚠️ notes, or run the on-demand inspection snippet from `/meshcraft` to confirm the key is live.

### "T2 — Semantic collection not found"

The Sandbox file you're targeting doesn't have T1/T2 variables set up. Either:
- Confirm you're pointing at the right file key (`u6xWbRPNRJgem7EwDrKfqr`)
- Or run the T1/T2 variable setup script (ask the design-ops channel for `setup-variables.js`)

### MCP tool not available in Claude session

- Confirm `~/.claude/claude_desktop_config.json` is valid JSON (use `python3 -m json.tool ~/.claude/claude_desktop_config.json` to validate)
- Confirm the `FIGMA_ACCESS_TOKEN` value has no extra whitespace or quotes inside the string
- Restart Claude Code completely (quit and reopen, not just a new session)
- Run `/mcp` inside Claude Code — if **figma** is not listed, the server failed to start. Check terminal output for errors.

### Font Fixer says "Font load failed: Mier B02"

Mier B02 is not installed on your machine.

1. Download from the internal font repo (link in #design-ops)
2. Double-click each `.ttf` file (Demi, Book, Bold) → **Install Font**
3. **Quit and reopen Figma Desktop** — Figma caches font lists on launch
4. Re-run MESH Font Fixer

### Text content didn't change after running Claude script

Expected behaviour in some cases — `loadFontAsync` silently fails when Mier B02 isn't available in the cloud plugin context. Text is authored in DM Sans by the Claude MCP script. Run MESH Font Fixer to convert the font, and set text content manually in Figma if needed. The token bindings (fills/colours) are always applied correctly regardless.

### "T2 token not found: color/X/Y"

The token path is either misspelled or doesn't exist in the Sandbox's T2 collection.

1. Open Figma → **Local variables** panel → T2 — Semantic
2. Search for the token name to confirm it exists
3. Cross-check against the T2 token reference table in `CLAUDE.md`

If a token is genuinely missing from T2, it needs to be added via the variable setup script — ping #design-ops.

### "missing layer: X" in Claude output log

The layer name in `mesh-layer-map.json` doesn't match the actual child layer name in that component variant. This usually means the MESH Library was updated and a layer was renamed.

1. Re-import and inspect the component using the on-demand snippet in `/meshcraft`
2. Find the correct layer name in the tree dump
3. Update `mesh-layer-map.json` locally and open a PR to `Uttham123/meshcraft`

---

## Keeping MeshCraft up to date

When the MESH Library is updated (new components, renamed layers, new variants), the key index and layer map need to be updated too.

```bash
git pull origin main   # get latest keys and map
```

If you discover a broken key or wrong layer name, please open a PR — the repo is the shared source of truth for the whole team.

**Design-ops owns:** `mesh-layer-map.json`, `mesh-component-keys.md`, the T1/T2 variable setup  
**Anyone can contribute:** on-demand layer inspections for newly used components, bug fixes in layer map

---

## Quick reference

```
Sandbox file key     : u6xWbRPNRJgem7EwDrKfqr
MESH Library key     : i2MPgsD7m0EUVJ9MbaFyZH
T2 collection name   : T2 — Semantic
Slash command        : /meshcraft
Font Fixer plugin    : meshcraft/mesh-font-fixer/
Shared token (PMs)   : 1Password → Design Ops → MeshCraft Service Token
Help                 : #design-ops on Slack
```
