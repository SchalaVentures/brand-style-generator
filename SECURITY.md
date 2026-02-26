# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Brand Style Generator, please report it responsibly. **Do not open a public GitHub issue.**

**Email:** security@brandstylegenerator.com

Include as much detail as possible:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Response Timeline

| Step | Timeframe |
|------|-----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 1 week |
| Fix or mitigation | Depends on severity |
| Public disclosure | After fix is deployed |

## Scope

The following are considered in scope:

- Authentication and session handling vulnerabilities
- Authorization bypasses (accessing other users' projects)
- Cross-site scripting (XSS)
- SQL injection or GraphQL injection
- Sensitive data exposure (tokens, credentials, user data)
- Server-side request forgery (SSRF)

## Out of Scope

- Denial of service (DoS) attacks
- Social engineering
- Attacks against third-party services (Nhost, Cloudflare, etc.)
- Vulnerabilities in dependencies without a demonstrated exploit in this project
- Issues that require physical access to a user's device

## Recognition

We're happy to credit reporters in release notes (with permission). We do not currently offer a bug bounty program.
