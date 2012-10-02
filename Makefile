
build: components index.js template.js
	@component build --dev

template.js:
	@./node_modules/minstache/bin/minstache < template.html > template.js

components:
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
