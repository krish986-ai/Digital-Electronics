import { TopicItem } from '../types';
import { FUNDAMENTAL_TOPICS } from './topics/fundamentals';
import { BOOLEAN_TOPICS } from './topics/booleanAndGates';
import { MINIMIZATION_TOPICS } from './topics/minimization';
import { COMBINATIONAL_TOPICS } from './topics/combinational';
import { SEQUENTIAL_TOPICS } from './topics/sequential';
import { REGISTERS_AND_COUNTERS_TOPICS } from './topics/registersAndCounters';
import { ADC_DAC_AND_LOGIC_TOPICS } from './topics/adcdacAndLogicFamilies';

export const ALL_TOPICS: TopicItem[] = [
  ...FUNDAMENTAL_TOPICS,
  ...BOOLEAN_TOPICS,
  ...MINIMIZATION_TOPICS,
  ...COMBINATIONAL_TOPICS,
  ...SEQUENTIAL_TOPICS,
  ...REGISTERS_AND_COUNTERS_TOPICS,
  ...ADC_DAC_AND_LOGIC_TOPICS,
];

export function getTopicBySlug(slug: string): TopicItem | undefined {
  return ALL_TOPICS.find((t) => t.slug === slug);
}

export function getTopicsByUnit(unitId: string): TopicItem[] {
  return ALL_TOPICS.filter((t) => t.unitId === unitId);
}
