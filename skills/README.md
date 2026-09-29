# Skills

Claude Code skills for working on the foundation. One folder per skill,
`SKILL.md` inside.

| Skill | Use it when |
|---|---|
| `shaadi-dna-update` | A new Figma export needs importing, checking, building and logging |
| `shaadi-code-connect` | Setting variable code syntax, or connecting components to Dev Mode |

## Making them available to Claude Code

Claude Code reads skills from `.claude/skills/`. Link this folder once, per clone:

```bash
mkdir -p .claude && ln -s ../skills .claude/skills
```

The link is git-ignored, so each person does it once and the skills themselves
stay version-controlled here, in the open, where they get reviewed like any
other file.

## Writing another one

Skills are for sequences with judgement in them — where the order matters and
getting it wrong causes damage. A single command doesn't need a skill; the
README covers that.

Each skill states: when to use it, the steps in order, the rules, and when to
**stop and ask** rather than proceed. That last part is what makes a skill
useful rather than a script with extra words.

Planned, once there's something to describe:

- `shaadi-component-spec` — write a component blueprint from a Figma component
- `shaadi-ui-review` — check a design or a PR against the FOUNDATION.md rules
