new Vue({
    el: '#monster',
    data: { //data is not reactive
        gameStarted: false,
        result: [],
        youHealth: 100,
        monsterHealth: 100,
        youProgressBar: {
            width: '400px' /*100% health*/
        },
        monsterProgressBar: {
            width: '400px'
        }
        
    },
    computed: { //only run when data changes
        youProgressBarNum: function() {
            return Number((this.youProgressBar.width).slice(0,-2));
        },
        monsterProgressNum: function() {
            return Number((this.monsterProgressBar.width).slice(0,-2)) //numberized
        }
    },
    watch: {
        youHealth: function() {
            if ( this.youHealth < 1 || this.monsterHealth < 1 ) {
                if ( this.youHealth <1 ) {
                    alert('monster wins!');
                } else {
                    alert('player wins!');
                }
                //reset
                this.reset();
            }
            
        }
    },
    methods: { // methods are reactive
        startNewGame: function() {
            this.gameStarted = true;
        },
        reset: function() {
            this.youProgressBar.width = '400px';
            this.youHealth = 100;
            this.monsterProgressBar.width = '400px';
            this.monsterHealth = 100;
            this.result = [];
            this.gameStarted = false;
        },
        randomIntFromInterval: function( min, max ) {
            return Math.floor( Math.random() * ( max-min+1 ) + min );
        },
        attackText: function( who, hitAmount ) {
            var whoUpper = who.toUpperCase();
            
            if ( whoUpper === 'PLAYER' ) {
                return whoUpper + ' HITS MONSTER FOR ' + hitAmount;
            } else {
                return whoUpper + ' HITS PLAYER FOR ' + hitAmount;
            }
        },
        healText: function( healAmount ) {
            return 'PLAYER HEALS FOR ' + healAmount;
        },
        modifyProgressBar: function( type, youAmount, monsterAmount ) {
            
            //normalized, division if progress width > 100
            var youAmountNorm = ( youAmount * 4 ),
                monsterAmountNorm = ( monsterAmount * 4 );
            
            if ( type === 'heal' ) {
                this.youProgressBar.width = this.youProgressBarNum + youAmountNorm - monsterAmountNorm + 'px';
                this.youHealth = this.youHealth + youAmount - monsterAmount;
            } else {
                this.youProgressBar.width = this.youProgressBarNum - monsterAmountNorm + 'px';
                this.monsterProgressBar.width = this.monsterProgressNum - youAmountNorm + 'px';
                
                this.youHealth -= monsterAmount;
                this.monsterHealth -= youAmount;
            }
        },
        doAttack: function() {
            var playerHitAmount = this.randomIntFromInterval(1,10);
            var monsterHitAmount = this.randomIntFromInterval(1,10);
            this.result.unshift( this.attackText( 'player', playerHitAmount ) );
            this.result.unshift( this.attackText( 'monster', monsterHitAmount ) );
            
            this.modifyProgressBar( 'attack', playerHitAmount, monsterHitAmount );
            
            return this.result;
            
        },
        doSpecialAttack: function() {
            var playerHitAmount = this.randomIntFromInterval(10,20);
            var monsterHitAmount = this.randomIntFromInterval(1,10);
            this.result.unshift( this.attackText( 'player', playerHitAmount ) );
            this.result.unshift( this.attackText( 'monster', monsterHitAmount ) );
            
            this.modifyProgressBar( 'attack', playerHitAmount, monsterHitAmount );
            
            return this.result;
            
        },
        doHeal: function() {
            var playerHealAmount = this.randomIntFromInterval(1,20);
            var monsterHitAmount = this.randomIntFromInterval(1,10);
            
            this.result.unshift( this.healText( playerHealAmount ) );
            this.result.unshift( this.attackText( 'monster', monsterHitAmount ) );
            
            this.modifyProgressBar( 'heal', playerHealAmount, monsterHitAmount );
            
            return this.result;
        },
        doGiveUp: function() {
            this.reset();
        }
    }
});