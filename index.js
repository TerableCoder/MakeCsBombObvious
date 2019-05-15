module.exports = function MakeCsBombObvious(mod) {	
	mod.game.initialize(["me"]);
    const bombId = 10151200;
    const GROW_ID = 7000005;
    const stack = 10;
    //const duration = 60000;

	mod.hook('S_ABNORMALITY_BEGIN', 3, event => {
		if(bombId !== event.id || mod.game.me.is(event.target)) return;
		applyChange(event.target, event.duration);
	});
	mod.hook('S_ABNORMALITY_REFRESH', 1, event => {
		if(bombId !== event.id || mod.game.me.is(event.target)) return;
		applyChange(event.target, event.duration);
	});
	mod.hook('S_ABNORMALITY_END', 1, event => {
		if(bombId !== event.id || mod.game.me.is(event.target)) return;
		removeChange(event.target);
	});

	function applyChange(target, duration){
        mod.toClient('S_ABNORMALITY_END', 1, {target: target, id: GROW_ID,});
        mod.toClient('S_ABNORMALITY_BEGIN', 3, {target: target, source: target, id: GROW_ID, duration: duration, unk: 0, stacks: stack, unk2: 0, unk3: 0});
    }
    function removeChange (target){
        mod.toClient('S_ABNORMALITY_BEGIN', 3, {target: target, source: target, id: GROW_ID, duration: 60000, unk: 0, stacks: stack, unk2: 0, unk3: 0});
        mod.toClient('S_ABNORMALITY_END', 1, {target: target, id: GROW_ID,});
	}
}