# Contributing to Backend Toolkit - BaaS

Thank you for your interest in contributing to Backend Toolkit - BaaS!

This project is being developed as an open-source initiative of the GFG BVCOE community, and contributions from developers of different skill levels are welcome.

## Before You Start

Before working on the project:

1. Read the `README.md`.
2. Read the `CODE_OF_CONDUCT.md`.
3. Check the existing Issues to find tasks that are already planned.
4. If you want to work on a new feature, discuss it with the maintainers before starting.

## How to Contribute

You can contribute in many ways:

- Add a new backend module.
- Improve an existing module.
- Fix bugs.
- Add tests.
- Improve documentation.
- Improve error handling.
- Improve the CLI/initializer.
- Add examples.
- Suggest new features.

## Basic Contribution Workflow

### 1. Find an Issue

Look through the project's open Issues and find something you would like to work on.

If you find an issue you want to work on, comment on it so that the maintainers know you are working on it.

### 2. Create a Branch

Do not make changes directly to the main branch.

Create a separate branch for your work.

Example:

```bash
git checkout -b feature/add-validation
```

### 3. Install and Build

Install the dependencies and build all packages from the repository root:

```bash
npm install
npm run build
```

The packages must be built before the examples can import them.

### 4. Make Your Changes

- Keep each pull request small and focused on one issue.
- Follow the existing code style and use TypeScript.
- Add or update documentation when you change behaviour.

### 5. Check Your Work

Before opening a pull request, make sure both of these pass:

```bash
npm run typecheck
npm run build
```

If you changed an example, also run it and confirm that it works.

### 6. Commit and Push

```bash
git add .
git commit -m "feat(validation): add common validators"
git push -u origin feature/add-validation
```

If you do not have write access to this repository, fork it first and push your branch to your fork.

### 7. Open a Pull Request

- Link the issue in the description with `Closes #<issue-number>`.
- Describe what you changed and how you tested it.
- A maintainer will review your pull request and may ask for changes. This is normal.

## About the Issues

Each issue covers one file or package and contains a checklist of tasks. You can complete all of the items in one pull request, or pick a few and say which ones in a comment on the issue.

## Questions

If something is unclear, open an issue or comment on the relevant one.