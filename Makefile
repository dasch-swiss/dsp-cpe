include vars.mk

.PHONY: docker-build
docker-build: ## build and publish CPE Docker image locally
	docker buildx build \
		--progress auto \
		-t $(DOCKER_IMAGE) -t $(DOCKER_REPO):latest \
		--load \
		.

.PHONY: docker-publish
docker-publish: ## publish Docker image to Docker-Hub
	docker buildx build \
		--progress auto \
		--platform linux/amd64,linux/arm64 \
		-t $(DOCKER_IMAGE) -t $(DOCKER_REPO):latest \
		--push \
		.

.PHONY: docker-run
docker-run: ## compile and run app locally
	docker run --rm -it -p 4200:4200 $(DOCKER_IMAGE)

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
