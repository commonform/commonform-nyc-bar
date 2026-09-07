BOILERPLATE= $(shell find boilerplate/ -type f -name '*.md')

variants: | node_modules
	rm -rf variants
	for form in $(BOILERPLATE); do \
		node generate-variants.js $$form; \
	done

node_modules:
	npm i
