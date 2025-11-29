/**
 * Utilitários para renderização direta de elementos DOM
 * Evita updates desnecessários do React durante o game loop
 */

export const renderPlayer = (playerRef, player) => {
  if (playerRef.current) {
    playerRef.current.style.transform = `translate(${player.x}px, ${player.y}px)`;
  }
};

export const renderKnife = (knifeRef, knife) => {
  if (knifeRef.current) {
    const angleDeg = (knife.angle * 180) / Math.PI + 90;
    knifeRef.current.style.transform = `translate(${knife.x}px, ${knife.y}px) rotate(${angleDeg}deg)`;
  }
};

export const renderEnemies = (enemiesRef, enemies) => {
  enemies.forEach((enemy, index) => {
    if (enemiesRef.current[index]) {
      enemiesRef.current[index].style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
    }
  });
};

export const renderDataCenter = (datacenterRef, datacenter) => {
  if (datacenterRef && datacenterRef.style) {
    datacenterRef.style.transform = `translate(${datacenter.x}px, ${datacenter.y}px)`;
  }
};
