/**
 * Copyright 2020 ZeoFlow SRL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const issueListLabelsForRepo = async ({zParser, zRepoOwner, zRepoName}) => {

    const {
        zContextParsed,
    } = zParser
    const {
        zRepository,
        zGithub,
    } = zContextParsed

    const listLabelsOnIssueData = await zGithub.issues.listLabelsForRepo({
        owner: zRepoOwner || zRepository.repositoryOwnerUsername,
        repo: zRepoName || zRepository.repositoryName,
        per_page: 100,
    })

    let labels = []
    listLabelsOnIssueData.data.forEach(labelJSON => {
        const label = {
            name: labelJSON.name,
            description: labelJSON.description,
            color: labelJSON.color,
            default: labelJSON.default,
            id: labelJSON.id,
        }
        labels.push(label)
    })

    return module.exports = {
        zLabels: labels,
    }
}

module.exports = {
    issueListLabelsForRepo,
}

