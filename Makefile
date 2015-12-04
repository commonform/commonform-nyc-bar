COMMONFORM=node_modules/.bin/commonform
BOILERPLATE= $(shell find boilerplate/ -type f -name '*.cform')

$(COMMONFORM):
	npm i

.PHONY: variants lint

variants: $(COMMONFORM)
	rm -rf variants
	for form in $(BOILERPLATE); do \
		node generate-variants.js $$form; \
	done

lint: variants $(COMMONFORM)
	for variant in variants/* ; do \
		echo ; \
		echo $$variant; \
		$(COMMONFORM) lint < $$variant | sort -u; \
	done
