AFRAME.registerComponent('ghost-chase', {
  init: function () {
    this.ghost = this.el;
    this.player = document.querySelector('#player');

    this.crawlSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderCrawling.m4a?v=1726989205904'); 
    this.attackSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderAttack_.m4a?v=1726988605221'); 

    this.deathMessage = document.querySelector('#death-message');

    this.isAttacking = false;
    this.isMoving = false;
  },
  tick: function () {
    const ghostPosition = this.ghost.object3D.position;
    const playerPosition = this.player.object3D.position;

    console.log('Player Position:', playerPosition);
    const distance = ghostPosition.distanceTo(playerPosition);

    const direction = new THREE.Vector3();
    direction.subVectors(playerPosition, ghostPosition).normalize();

    const ghostRotation = this.ghost.object3D.rotation;
    const angle = Math.atan2(direction.x, direction.z);
    ghostRotation.y = angle;

    if (distance <= 5) {
      if (!this.isAttacking) {
        this.attackSound.play();  
        this.deathMessage.style.display = 'block'; 
        this.isAttacking = true;  
        this.crawlSound.pause();  

        // Reload the scene after a delay
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      return;  
    } else {
      this.isAttacking = false;  
    }

    if (distance < 100 && distance > 50) {
      this.moveGhost(ghostPosition, direction, 0.03); 
    } else if (distance <= 50) {
      this.moveGhost(ghostPosition, direction, 0.07); 
    }

    if (this.isMoving && this.crawlSound.paused) {
      this.crawlSound.loop = true;  
      this.crawlSound.play();  
    }
  },
  moveGhost: function (ghostPosition, direction, speed) {
    ghostPosition.add(direction.multiplyScalar(speed));  
    this.isMoving = true;
  },
  remove: function () {
    this.crawlSound.pause();
    this.crawlSound.currentTime = 0;
  }
});
