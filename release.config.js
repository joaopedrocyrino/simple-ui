module.exports = {
    "branches": ["main"],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/github",
            {
                "assets": [
                    "dist/**/*.js",
                    "dist/**/*.d.ts",
                    "dist/**/*.map"
                ]
            }
        ],
        "@semantic-release/changelog",
        "@semantic-release/git"
    ]
}

