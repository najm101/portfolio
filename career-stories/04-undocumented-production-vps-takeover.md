# Taking Over an Undocumented Production VPS

## Short version

Although I was working as a mobile engineer, the applications depended on a .NET backend running on an undocumented VPS with no CI/CD or separate development environment. I containerized the backend and database, introduced Docker Compose and Dokploy, created a development environment, and automated backend and mobile deployments without taking production down.

## Detailed story in my voice

So, my main responsibility at Tuwaiq was mobile development, but the mobile applications depended on a .NET backend running on the team's VPS. The server had no useful documentation, there was no automated deployment process, and there was no separate development environment.

This meant production was also where changes could end up being tested. The server was a single point of failure, and a manual deployment depended too much on whoever remembered the current process.

The task I took on was to make the backend easier to deploy and safer to change without interrupting the running production service. This was outside the narrow definition of a Flutter role, but it directly affected whether the mobile applications could be developed and released reliably.

I first needed to understand what was running on the VPS and how the .NET backend and database depended on each other. I then containerized the backend and database using Docker. Docker Compose became the description of how those services fit together, which also made the infrastructure more understandable than a collection of manual server commands.

I installed Dokploy as the deployment platform and created a separate development environment. This gave developers somewhere to test changes before they touched production.

After the environments were separated, I connected the backend deployment to CI/CD. I also connected the mobile release process to automation, so the backend and mobile delivery paths no longer relied on the previous manual steps.

The recorded result is that there was no deployment downtime after the new setup was introduced. Developers could test changes in the development environment before production, and the Docker Compose files made the backend setup more self-documenting.

What I learned is that taking responsibility for production infrastructure without documentation creates avoidable pressure. I was able to improve the system, but if I did it again, I would write a recovery runbook before changing the live environment. The runbook should explain how to restore the previous state, how to start each service, and how to respond if a deployment fails.

The story is useful to me because it shows that I do not treat the mobile client as an isolated product. If the API, database, deployment process, or environment is blocking reliable delivery, I am comfortable understanding that part of the system and improving it.

## How I approached it

1. I recognized that the undocumented VPS and manual deployment process were production risks.
2. I mapped the dependency between the .NET backend and its database.
3. I containerized the backend and database with Docker.
4. I used Docker Compose to define the service relationship and configuration.
5. I deployed Dokploy as the deployment platform.
6. I created a separate development environment.
7. I added automated deployment for the backend.
8. I also automated the mobile release path.
9. I kept the production service running while making the transition.

## Result

- No deployment downtime after the new setup was introduced.
- Developers could test in development before touching production.
- Backend deployment no longer depended entirely on undocumented manual steps.
- Docker Compose provided a readable description of the deployed services.
- Backend and mobile delivery both gained automated pipelines.

## Best questions for this story

- Tell me about a problem you solved outside your formal responsibilities.
- Tell me about a time you inherited an undocumented system.
- How have you improved deployment safety?
- Tell me about a production system you took ownership of.
- How do you approach a system when there is no documentation?
- Tell me about your Docker, CI/CD, or VPS experience.

## Factual boundaries

- The backend was .NET and the database was containerized with it, but the current story material does not record the exact database engine used in this VPS migration.
- The current material does not record the VPS provider, server size, detailed network topology, or individual pipeline steps.
- Do not invent deployment-frequency, build-time, or cost-reduction metrics.
- The supported result is zero deployment downtime after the change and the availability of a separate development environment.

