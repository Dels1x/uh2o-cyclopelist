import path from 'path';
import fs from 'fs';
import * as yaml from "js-yaml";

const demonsDirectory = path.join(process.cwd(), 'demons');

export function getSortedDemonsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(demonsDirectory);
    const allDemonsData = fileNames.map((fileName) => {
        // remove file extension to get a proper id
        const id = fileName.replace(/\.yml$/, '');

        // read yaml file as string
        const fullPath = path.join(demonsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Parse YAML content using js-yaml
        const yamlData = yaml.load(fileContents, 'utf8');

        yamlData['difficulty'] = getDemonDifficulty(yamlData.points);

        // Combine the data with an id
        return {
            id,
            ...yamlData
        };
    });

    console.log('allPostsData ' + allDemonsData);

    return allDemonsData.sort((a, b) => {
        if (Number(a.points) > Number(b.points)) {
            return -1
        } else {
            return 1;
        }
    })
}

export function getAllDemonIds() {
    const fileNames = fs.readdirSync(demonsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.yml$/, ''),
            },
        };
    });
}

export function getDemonData(id) {
    // read yaml file as string
    const fullPath = path.join(demonsDirectory, `${id}.yml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse YAML content using js-yaml
    const yamlData = yaml.load(fileContents);

    yamlData['difficulty'] = getDemonDifficulty(yamlData.points);

    return {
        id,
        ...yamlData
    };
}

function getDemonDifficulty(points) {
    if (points >= 175) {
        return 'sapphire';
    } else if (points >= 100) {
        return 'platinum';
    } else {
        return 'amber';
    }
}