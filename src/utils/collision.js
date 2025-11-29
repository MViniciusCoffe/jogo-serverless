/**
 * Utilitários de detecção de colisão
 */

/**
 * Verifica colisão AABB (Axis-Aligned Bounding Box)
 * entre duas entidades retangulares
 */
export const checkAABBCollision = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + obj2.size &&
    obj1.x + obj1.size > obj2.x &&
    obj1.y < obj2.y + obj2.size &&
    obj1.y + obj1.size > obj2.y
  );
};

/**
 * Verifica colisão circular entre um ponto
 * e um círculo
 */
export const checkCircleCollision = (pointX, pointY, centerX, centerY, radius) => {
  const distX = pointX - centerX;
  const distY = pointY - centerY;
  const distance = Math.sqrt(distX * distX + distY * distY);
  return distance < radius;
};

/**
 * Calcula distância euclidiana entre dois pontos
 */
export const getDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Obtém o centro de uma entidade quadrada
 */
export const getCenter = (entity) => ({
  x: entity.x + entity.size / 2,
  y: entity.y + entity.size / 2,
});

/**
 * Calcula vetor de movimento em direção a um alvo
 */
export const getDirectionVector = (fromX, fromY, toX, toY) => {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) return { dx: 0, dy: 0 };

  return {
    dx: dx / distance,
    dy: dy / distance,
  };
};
