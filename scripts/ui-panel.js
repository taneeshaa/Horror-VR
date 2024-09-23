import * as THREE from 'three';

// Function to draw text on the canvas
function drawUI(context, text) {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#ffffff'; // White text
    context.font = '24px Arial';
    context.fillText(text, 20, 40);
}

export function createUI(scene, text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512; // Set width for the UI
    canvas.height = 256; // Set height for the UI

    // Call drawUI initially
    drawUI(context, 'Collect all the dolls and burn them, while escaping the spider!');

    // Create texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    const uiMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const uiPlaneGeometry = new THREE.PlaneGeometry(8, 4); // Adjust size as needed
    const uiPlaneMesh = new THREE.Mesh(uiPlaneGeometry, uiMaterial);
    uiPlaneMesh.position.set(-23, 5, -29); // Position it where you want
    scene.add(uiPlaneMesh);

    // Update the UI with the provided text
    drawUI(context, text);

    // Mark the texture as needing an update
    texture.needsUpdate = true;
}
