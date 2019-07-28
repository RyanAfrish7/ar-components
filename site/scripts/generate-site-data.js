/* eslint-disable no-console */
/* eslint-disable no-extraneous-import */
const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");

// eslint-disable-next-line import/no-extraneous-dependencies
const args = require("minimist")(process.argv, {
    alias: {
        outputDirectory: ["output-directory", "o"],
        packagesDirectory: ["packages-directory", "p"],
    },
});

async function getPackageJsons(rootPackageJson, packagesDirectory) {
    return Promise.all(
        (await fs.readdir(packagesDirectory))
            .map(async directory => ({
                directory,
                content: JSON.parse(await fs.readFile(path.join(packagesDirectory, directory, "package.json"), "utf8")),
            })),
    ).then(packages => packages.map(({ content: packageJson, directory }) => ({
        ...packageJson,
        repository: {
            ...rootPackageJson.repository,
            directory: `packages/${directory}`,
        },
    })));
}

async function generatePackagesJson(
    packagesDirectory,
    outputDirectory,
) {
    const packageJsons = await getPackageJsons(await fs.readFile("package.json", "utf8")
        .then(packageJson => JSON.parse(packageJson)), packagesDirectory);

    await fs.writeFile(path.join(outputDirectory, "packages.json"), JSON.stringify(packageJsons), "utf8");
}

async function generateReadmeFiles(
    packagesDirectory,
    outputDirectory,
) {
    const packages = (await fs.readdir(packagesDirectory));

    await Promise.all(packages.map(async (packageName) => {
        const readmeMarkdown = await fs.readFile(path.join(packagesDirectory, packageName, "README.md"), "utf8");

        await fetch("https://api.github.com/markdown", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json",
            },
            body: JSON.stringify({
                text: readmeMarkdown,
                mode: "gfm",
                context: "ryanafrish7/ar-components",
            }),
        })
            .then(response => response.text())
            .then(async (response) => {
                await fs.mkdir(path.join(outputDirectory, "readme"), {
                    recursive: true,
                });
                await fs.writeFile(path.join(outputDirectory, "readme", `${packageName}.html`), response, "utf8");
            });
    }));
}

async function main({
    packagesDirectory,
    outputDirectory,
}) {
    await fs.mkdir(outputDirectory, { recursive: true });

    await generatePackagesJson(packagesDirectory, outputDirectory);
    await generateReadmeFiles(packagesDirectory, outputDirectory);
}

main({
    packagesDirectory: path.resolve(args.packagesDirectory),
    outputDirectory: path.resolve(args.outputDirectory),
}).catch(error => console.error(error));
