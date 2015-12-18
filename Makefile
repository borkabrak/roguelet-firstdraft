default:
	scss --sourcemap=none jgame.scss:jgame.css

build: default

clean:
	rm *.css *.css.map

