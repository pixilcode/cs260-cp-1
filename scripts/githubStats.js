const releasesElement = document.getElementById("releases")
const url = "https://api.github.com/repos/pixilcode/tego-lang/releases"

fetch(url)
    .then(response => response.json())
    .then(releases => 
        releases
            .slice(0, 5)
            .map(release => ({
                html_url: release.html_url,
                tag_name: release.tag_name,
                published_at: release.published_at,
                body: marked.parse(release.body)
            }))
            .map(release => {
                const section = document.createElement("section")
                section.classList.add("release")

                const header = document.createElement("h3")
                const headerLink = document.createElement("a")
                headerLink.href = release.html_url
                headerLink.innerText = release.tag_name
                header.appendChild(headerLink)

                const subheading = document.createElement("h4")
                const publishDate = new Date(release.published_at)
                subheading.innerText = `Published ${publishDate.getFullYear()}-${publishDate.getMonth()+1}-${publishDate.getDate()}`

                const releaseBody = document.createElement("section")
                releaseBody.classList.add("releaseBody")
                releaseBody.innerHTML = release.body

                section.appendChild(header)
                section.appendChild(subheading)
                section.appendChild(releaseBody)

                return section
            })
            .forEach(release => {
                releasesElement.appendChild(document.createElement("hr"))
                releasesElement.appendChild(release)
            })
    )
