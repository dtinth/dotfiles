---
name: reflect-on-work
description: "Systematic reflection process to analyze recent work and extract learnings. Evaluates what went well, what failed, what was confusing, and what knowledge would help future instances. Produces actionable insights and documentation updates. Use when: user says 'reflect', asks 'what did we learn?', completes a significant feature, or wraps up focused work."
---

# Reflect on Work Skill

## When to Use

Claude should activate this skill when:

- User explicitly says "reflect" or "let's reflect"
- User asks "what did we learn?" or similar retrospective questions
- After completing a significant feature or refactoring
- When wrapping up a session of focused work
- User asks for a "reflection process playbook" or structured analysis

## Reflection Process

### 1. Analyze Recent Work Systematically

Examine the work session across four key dimensions (present as unnumbered analysis):

**What went well and should be repeated in future work**

- Identify successful patterns, approaches, and decisions
- Note what accelerated progress or reduced problems
- Include both technical patterns and process improvements

**What went wrong and needed user correction or intervention**

- Document failures, mistakes, or misunderstandings
- Note what the user had to correct or clarify
- Include assumptions that proved wrong

**What you struggled with, found confusing, or took multiple attempts**

- Identify areas that required iteration or rework
- Include concepts that weren't immediately clear
- Note where better understanding would have helped

**What knowledge would help future Claude instances avoid these issues**

- Synthesize insights into concrete, actionable guidance
- Focus on patterns that generalize across projects
- Include both technical knowledge and meta-knowledge about the workflow

### 2. Create Separate List of Proposed Changes

Generate a numbered list of specific improvements to documentation (typically CLAUDE.md or project-specific docs):

- Each item should be concrete and actionable
- Format as "Add/Update [section]: [specific change]"
- Ready for user approval and implementation

### 3. Present Both Lists to User

Show the analysis and proposed changes, then:

- Wait for user feedback before making changes
- Ask for clarifications if guidance is ambiguous
- Allow user to modify, remove, or add to proposals

### 4. Implement Approved Changes

After user approval:

- Update documentation (usually CLAUDE.md) with approved items
- Convert numbered lists to bullet points for documentation
- Add to appropriate existing sections rather than creating new ones

## Knowledge Extraction Framework

When reflecting, look for patterns in:

- **Technical patterns**: Code organization, architecture decisions, reusable abstractions
- **Tool usage**: When to use specialized agents vs. direct tools, optimal tool combinations
- **Process workflows**: Command sequences, file management, iteration strategies
- **User interaction**: What required clarification, what was assumed correctly
- **Error prevention**: Common mistakes and how to avoid them
- **Knowledge gaps**: Missing context that caused delays or rework

## Documentation Integration

### Format Guidelines

- Use bullet points, not numbered lists (easier to maintain)
- Start with action verb: "Always...", "Avoid...", "Use...", "Check..."
- Keep each point to 1-2 sentences
- Include brief reasoning when helpful
- Reference file paths when showing patterns: `file_path:line_number`

## Example Output

A reflection typically produces:

```
## Analysis (Unnumbered)

**What went well:**
- [items...]

**What went wrong:**
- [items...]

**What I struggled with:**
- [items...]

**Knowledge for future instances:**
- [items...]

## Proposed CLAUDE.md Changes (Numbered)

1. Add to [section]: "[short excerpt or summary]..."
2. [more items...]
```

## Success Criteria

A quality reflection:

- ✅ Identifies 3+ specific learnings from the work
- ✅ Includes both technical patterns and process insights
- ✅ Proposes concrete documentation changes (not vague improvements)
- ✅ Is actionable for future Claude instances or team members
- ✅ Avoids generic statements ("communication is important")
- ✅ Focuses on specific, repeatable patterns
