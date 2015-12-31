default:
	scss --sourcemap=none jgame.scss:jgame.css

build: default

ti-up:
	mkdir -p log
	ticgitweb >> log/ticgitweb.log &

ti: ti-up

ti-down:
	@# Ideally, we'd make sure to shut down just *our* server..
	killall ticgitweb

ti-status:
	ps aux | grep ticgitweb | grep -v grep

clean:
	rm *.css *.css.map log/*

