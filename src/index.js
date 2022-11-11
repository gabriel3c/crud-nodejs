const express = require('express')

const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const repositories = []

app.get('/repositories', (request, response) => {
	return response.json(repositories)
})

app.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body

	const repo = {
		id: uuid(),
		likes: 0,
		techs,
		title,
		url,
	}

	repositories.push(repo)

	return response.status(201).json(repo)
})

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params
	const { title, techs, url } = request.body

	const repo = repositories.find((repo) => repo.id === id)
	if (!repo) return response.status(404).json({ error: 'Repository not found' })

	repo.title = title || repo.title
	repo.techs = techs || repo.techs
	repo.url = url || repo.url

	return response.json(repo)
})

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params

	const repo = repositories.find((repo) => repo.id === id)

	if (!repo) return response.status(404).json({ error: 'Repository not found' })

	repositories.splice(repo, 1)

	return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params

	const repo = repositories.find((repo) => repo.id === id)

	if (!repo) return response.status(404).json({ error: 'Repository not found' })

	repo.likes++

	return response.json(repo)
})

module.exports = app
