AFRAME.registerComponent('ghost-chase', {
  init: function () {
    this.ghost = this.el;
    this.player = document.querySelector('#player');

    // Load sounds but don't play them yet
    this.crawlSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderCrawling.m4a?v=1726989205904'); 
    this.attackSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderAttack_.m4a?v=1726988605221'); 

    this.deathMessage = document.querySelector('#death-message');

    this.isAttacking = false;
    this.isMoving = false;
    this.isInteractionDone = false;

    // Create 3.js bounding boxes for the pwlayer and ghost
    this.ghostBB = new THREE.Box3().setFromObject(this.ghost.object3D);
    this.playerBB = new THREE.Box3().setFromObject(this.player.object3D);

    // Add a BoxHelper for debugging (visualizing bounding boxes)
    this.ghostHelper = new THREE.BoxHelper(this.ghost.object3D, 0xff0000); // Red for ghost
    this.playerHelper = new THREE.BoxHelper(this.player.object3D, 0x00ff00); // Green for player

    // Add the bounding box helpers to the scene's object3D
    this.ghost.sceneEl.object3D.add(this.ghostHelper);
    this.player.sceneEl.object3D.add(this.playerHelper);

    // Listen for user interaction to allow sound playing
    document.addEventListener('click', () => {
      if (!this.isInteractionDone) {
        this.isInteractionDone = true; // Allow sound to play
      }
    });
  },

  tick: function () {
    const ghostPosition = this.ghost.object3D.position;
    const playerPosition = this.player.object3D.position;

    // Update the bounding boxes each frame
    this.ghostBB.setFromObject(this.ghost.object3D);
    this.playerBB.setFromObject(this.player.object3D);

    // Update the visual box helpers
    this.ghostHelper.update();
    this.playerHelper.update();

    // Check for collision between ghost and player using Box3.intersectsBox
    if (this.ghostBB.intersectsBox(this.playerBB)) {
      if (!this.isAttacking) {
        if (this.isInteractionDone) {
          this.attackSound.play();  // Play attack sound when collision happens
        }
        this.deathMessage.style.display = 'block'; // Display "You Died" message
        this.isAttacking = true;

        // Reload scene after 2 seconds
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      return;
    }

    // Rotate the ghost towards the player
    const direction = new THREE.Vector3();
    direction.subVectors(playerPosition, ghostPosition).normalize();

    const ghostRotation = this.ghost.object3D.rotation;
    const angle = Math.atan2(direction.x, direction.z);
    ghostRotation.y = angle;

    // Check distance between ghost and player
    const distance = ghostPosition.distanceTo(playerPosition);

    // Ghost movement logic
    if (distance > 10) {
      // Move ghost toward the player only if it's more than 10 units away
      ghostPosition.add(direction.multiplyScalar(0.05)); 

      // Play walking sound while ghost is moving
      if (!this.isMoving && this.isInteractionDone) {
        this.crawlSound.loop = true;
        this.crawlSound.play();
        this.isMoving = true;  // Set moving flag to true
      }
    } else {
      // Stop walking sound when ghost stops
      if (this.isMoving) {
        this.crawlSound.pause();
        this.isMoving = false;  // Set moving flag to false
      }
    }
  }
});
