# Project Rules for AI Assistants (Cline/Roo-Cline)

## Introduction

This document outlines the specific rules and guidelines for AI assistants, such as Cline/Roo-Cline, when working on the portfolio website project. The purpose is to ensure consistent, effective, and safe collaboration that aligns with the project's established standards and documentation.

## Core Principle: Adherence to Project Standards

The primary principle is strict adherence to the existing project documentation and conventions. AI assistants should **complement** and **support** the established practices, not contradict or override them. Before taking any action, consult the relevant documentation.

## Information Sources

Prioritize information retrieval in the following order:

1.  **Project-Specific Documentation:**
    *   `PRD.md` (Product Requirements Document)
    *   `TECH_STACK.md` (Technology Stack)
    *   `APP_FLOW.md` (Application Flow)
    *   `FRONTEND_GUIDELINES.md` (Frontend Development Guidelines)
    *   `BACKEND_STRUCTURE.md` (Backend Structure and Logic)
    *   `QA_Test_Plan.md` (Quality Assurance Test Plan)
    *   `CONTRIBUTING.md` (Contribution Guidelines)
    *   `README.md` (Project Overview)
2.  **Codebase:** Existing code comments, type definitions (`src/types`), and established patterns within the project.
3.  **General Knowledge:** Use general programming knowledge only when project-specific information is unavailable or insufficient. Always verify if general solutions align with project conventions.

## Code Generation & Modification

*   **Frontend:** Strictly follow the guidelines outlined in `FRONTEND_GUIDELINES.md` for all React components, styling (Tailwind CSS v4, shadcn/ui), state management, and component structure.
*   **Backend:** Adhere to the patterns defined in `BACKEND_STRUCTURE.md` for Supabase interactions (including client usage, RLS considerations), Next.js Server Actions, API routes (if any), and overall backend logic.
*   **TypeScript:** Maintain TypeScript strict mode compliance. Utilize and define types appropriately, referencing `src/types` where applicable. Ensure all new code is strongly typed.
*   **Comments:** Write clear and concise comments for complex logic, non-obvious code sections, and `TODO` or `FIXME` markers. Explain the *why*, not just the *what*.
*   **File Modifications:**
    *   When making targeted changes, prefer the `apply_diff` tool for precision. Ensure the `SEARCH` block exactly matches the existing code, including whitespace.
    *   When using `write_to_file` (e.g., for creating new files or significant rewrites), **always provide the complete, final content of the file.** Do not use placeholders or omit unchanged sections.
*   **Clarity & Maintainability:** Prioritize writing code that is easy to understand, maintain, and debug. Follow project naming conventions and code formatting standards (ESLint/Prettier configured in the project).

## Tool Usage

*   **Iterative Approach:** Use tools one step at a time. Wait for user confirmation of success before proceeding to the next step. Do not chain actions based on assumed success.
*   **Prefer Specific Tools:** Utilize specialized tools like `list_files`, `read_file`, `apply_diff`, `insert_content`, `search_and_replace`, `list_code_definition_names` over generic shell commands (`ls`, `cat`, `sed`, `grep`) when a dedicated tool provides better structure, context, or safety.
*   **Command Execution:** When using `execute_command`, clearly explain the purpose and expected outcome of the command *before* requesting execution.
*   **Asking Questions:** Use `ask_followup_question` sparingly. Only ask when essential information cannot be found in the provided documentation or codebase, or reasonably inferred. Always provide specific, actionable suggestions as potential answers.

## Communication

*   **Be Concise & Technical:** Avoid conversational filler ("Great!", "Okay, sure"). Focus on technical accuracy and clarity.
*   **State Actions Clearly:** Explicitly state the action you are taking or planning to take (e.g., "Reading file X", "Applying diff to file Y", "Creating content for file Z").
*   **Completion Summary:** When using `attempt_completion`, provide a clear and concise summary of the completed task in the `result` parameter. If creating/modifying files, state which files were affected.

## Testing

*   **Consult Test Plan:** Be aware of the testing strategies outlined in `QA_Test_Plan.md`.
*   **Suggest/Add Tests:** When adding new features or modifying existing ones significantly, consider suggesting or adding relevant tests. This may include:
    *   End-to-End (E2E) tests using Playwright (referencing `tests/`).
    *   Unit or Integration tests (using Vitest/React Testing Library, if configured).

## Security

*   **Sensitive Information:** **Never** include API keys, passwords, database connection strings, or other secrets directly in your responses or generated code. Refer to environment variables (`.env.local`, `.env.example`) or secure configuration methods.
*   **Supabase RLS:** Be mindful of Supabase Row Level Security (RLS) policies when generating database queries or Server Actions. Ensure code respects data access restrictions.
*   **Server Action Validation:** Always include robust input validation within Next.js Server Actions to prevent security vulnerabilities (e.g., using Zod or similar libraries if adopted by the project).

## Scope Management

*   **Focus on the Task:** Strictly adhere to the specific task assigned by the user.
*   **Avoid Unrelated Changes:** Do not perform unrelated refactoring, cleanup, or feature additions unless explicitly requested as part of the current task. If you identify potential improvements outside the scope, mention them separately for consideration but do not implement them without approval.