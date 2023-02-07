include vars.mk

.PHONY: build-dsp-app-image
build-dsp-cpe-image: ## build DSP CPE image locally
	docker build -t $(DSP_CPE_IMAGE) .
	docker tag $(DSP_CPE_IMAGE) $(DSP_CPE_REPO):latest