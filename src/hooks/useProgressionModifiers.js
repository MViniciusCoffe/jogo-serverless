import { useMemo, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

/**
 * Hook que calcula os modificadores de stats baseado no SO e Apps instalados
 * Retorna multiplicadores para todas as stats do jogo
 */
export const useProgressionModifiers = (selectedOS, installedApps = [], difficulty = null) => {
  // Calcula os modificadores combinados do SO e Apps
  const modifiers = useMemo(() => {
    const base = {
      // Multiplicadores do jogador
      playerSpeed: 1,
      damageMultiplier: 1,
      defenseMultiplier: 1,
      maxHealthMultiplier: 1,
      healthRegen: 0,
      critChance: 0,
      critDamage: 1,
      cooldownMultiplier: 1,
      xpMultiplier: 1,
      attackSpeed: 1,

      // Multiplicadores de custo
      upgradeCost: 1,
      appCost: 1,

      // Modificadores de inimigos
      enemySpeed: 1,
      enemyHealth: 1,
      enemyDamage: 1,
      spawnRate: 1,
      enemyPredictability: 1,

      // Modificadores especiais
      moneyDrop: 1,
      appVariety: 1,
      virusChance: 0,
      freezeChance: 0,
      freezeDuration: 0,
      reviveCount: 0,
      piercing: false,
      cloneCount: 0,
      cloneDuration: 0,
      cloneDamage: 0,
      autoHelper: false,
      teleportCooldown: 0,
      teleportRange: 0,
    };

    // Aplica modificadores de dificuldade
    if (difficulty?.multipliers) {
      base.enemyHealth *= difficulty.multipliers.enemyHealth || 1;
      base.enemySpeed *= difficulty.multipliers.enemySpeed || 1;
      base.enemyDamage *= difficulty.multipliers.enemyDamage || 1;
      base.spawnRate *= difficulty.multipliers.spawnRate || 1;
      base.moneyDrop *= difficulty.multipliers.moneyDrop || 1;
    }

    // Aplica modificadores do SO
    if (selectedOS?.effects) {
      const effects = selectedOS.effects;

      if (effects.playerSpeed) base.playerSpeed *= effects.playerSpeed;
      if (effects.damageMultiplier) base.damageMultiplier *= effects.damageMultiplier;
      if (effects.defenseMultiplier) base.defenseMultiplier *= effects.defenseMultiplier;
      if (effects.maxHealthMultiplier) base.maxHealthMultiplier *= effects.maxHealthMultiplier;
      if (effects.healthRegen) base.healthRegen += effects.healthRegen;
      if (effects.critChance) base.critChance += effects.critChance;
      if (effects.critDamage) base.critDamage *= effects.critDamage;
      if (effects.cooldownMultiplier) base.cooldownMultiplier *= effects.cooldownMultiplier;
      if (effects.xpMultiplier) base.xpMultiplier *= effects.xpMultiplier;
      if (effects.xpBonus) base.xpMultiplier *= effects.xpBonus;
      if (effects.upgradeCost) base.upgradeCost *= effects.upgradeCost;
      if (effects.appCost) base.appCost *= effects.appCost;
      if (effects.appVariety) base.appVariety *= effects.appVariety;
      if (effects.virusChance) base.virusChance = effects.virusChance;
      if (effects.freezeChance) base.freezeChance = effects.freezeChance;
      if (effects.freezeDuration) base.freezeDuration = effects.freezeDuration;
      if (effects.reviveCount) base.reviveCount = effects.reviveCount;
      if (effects.enemyPredictability) base.enemyPredictability *= effects.enemyPredictability;
      if (effects.allStatsBonus) {
        base.damageMultiplier *= effects.allStatsBonus;
        base.defenseMultiplier *= effects.allStatsBonus;
        base.playerSpeed *= effects.allStatsBonus;
      }
    }

    // Aplica modificadores de cada App instalado
    installedApps.forEach((app) => {
      if (!app?.effects) return;
      const effects = app.effects;

      if (effects.playerSpeed) base.playerSpeed *= effects.playerSpeed;
      if (effects.damageMultiplier) base.damageMultiplier *= effects.damageMultiplier;
      if (effects.defenseMultiplier) base.defenseMultiplier *= effects.defenseMultiplier;
      if (effects.maxHealthMultiplier) base.maxHealthMultiplier *= effects.maxHealthMultiplier;
      if (effects.healthRegen) base.healthRegen += effects.healthRegen;
      if (effects.critChance) base.critChance += effects.critChance;
      if (effects.critDamage) base.critDamage *= effects.critDamage;
      if (effects.cooldownMultiplier) base.cooldownMultiplier *= effects.cooldownMultiplier;
      if (effects.xpMultiplier) base.xpMultiplier *= effects.xpMultiplier;
      if (effects.attackSpeed) base.attackSpeed *= effects.attackSpeed;
      if (effects.attackSpeedBoost) base.attackSpeed *= effects.attackSpeedBoost;
      if (effects.enemySpeed) base.enemySpeed *= effects.enemySpeed;
      if (effects.spawnRate) base.spawnRate *= effects.spawnRate;
      if (effects.piercing) base.piercing = true;
      if (effects.cloneCount) base.cloneCount = effects.cloneCount;
      if (effects.cloneDuration) base.cloneDuration = effects.cloneDuration;
      if (effects.cloneDamage) base.cloneDamage = effects.cloneDamage;
      if (effects.autoHelper) base.autoHelper = true;
      if (effects.teleportCooldown) base.teleportCooldown = effects.teleportCooldown;
      if (effects.teleportRange) base.teleportRange = effects.teleportRange;
      if (effects.allStatsBonus) {
        base.damageMultiplier *= effects.allStatsBonus;
        base.defenseMultiplier *= effects.allStatsBonus;
        base.playerSpeed *= effects.allStatsBonus;
      }
    });

    return base;
  }, [selectedOS, installedApps, difficulty]);

  // Calcula stats finais do player
  const getPlayerStats = useCallback(() => {
    return {
      speed: GAME_CONFIG.PLAYER.SPEED * modifiers.playerSpeed,
      maxHealth: GAME_CONFIG.PLAYER.MAX_HEALTH * modifiers.maxHealthMultiplier,
      damage: GAME_CONFIG.KNIFE.DAMAGE * modifiers.damageMultiplier,
      defense: modifiers.defenseMultiplier,
      healthRegen: modifiers.healthRegen,
      critChance: modifiers.critChance,
      critDamage: modifiers.critDamage,
    };
  }, [modifiers]);

  // Calcula stats de inimigos
  const getEnemyStats = useCallback(
    (baseStats) => {
      return {
        health: baseStats.health * modifiers.enemyHealth,
        speed: baseStats.speed * modifiers.enemySpeed,
        damage: baseStats.damage * modifiers.enemyDamage,
      };
    },
    [modifiers]
  );

  // Calcula dano final (com crítico)
  const calculateDamage = useCallback(
    (baseDamage) => {
      let damage = baseDamage * modifiers.damageMultiplier;

      // Verifica crítico
      if (Math.random() < modifiers.critChance) {
        damage *= modifiers.critDamage * 1.5; // 150% de dano crítico base
      }

      return damage;
    },
    [modifiers]
  );

  // Calcula dano recebido (com defesa)
  const calculateDamageTaken = useCallback(
    (incomingDamage) => {
      return incomingDamage / modifiers.defenseMultiplier;
    },
    [modifiers]
  );

  return {
    modifiers,
    getPlayerStats,
    getEnemyStats,
    calculateDamage,
    calculateDamageTaken,
  };
};
