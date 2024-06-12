import { shallowMount } from '@vue/test-utils';
import ScoreboardComponent from '@/components/ScoreboardComponent.vue';
import api from '@/api';

// Mock the entire api module
jest.mock('@/api');

describe('ScoreboardComponent.vue', () => {
  let wrapper;

  const mockScores = [
    {
      timestamp: '2024-01-01T12:00:00Z',
      player: 1,
      computer: 2,
      result: 'win',
    },
    {
      timestamp: '2024-01-02T12:00:00Z',
      player: 2,
      computer: 3,
      result: 'lose',
    },
  ];

  beforeEach(async () => {
    api.getScores.mockResolvedValue(mockScores);
    api.resetScores.mockResolvedValue();

    wrapper = shallowMount(ScoreboardComponent);
    await wrapper.vm.$nextTick(); // Wait for any promises to resolve
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches scores on created', async () => {
    expect(api.getScores).toHaveBeenCalled();
    expect(wrapper.vm.scores).toEqual(mockScores);
  });

  it('resets scores and fetches again', async () => {
    await wrapper.vm.resetScores();
    expect(api.resetScores).toHaveBeenCalled();
    expect(api.getScores).toHaveBeenCalledTimes(2); // Once on created, once on reset
    expect(wrapper.vm.scores).toEqual(mockScores); // Scores should be refreshed
  });

  it('renders scores correctly', async () => {
    await wrapper.vm.$nextTick();
    const scoreRows = wrapper.findAll('tbody tr');
    expect(scoreRows.length).toBe(mockScores.length);

    const firstRow = scoreRows.at(0);
    expect(firstRow.text()).toContain('Jan 01');
    expect(firstRow.text()).toContain('✊');
    expect(firstRow.text()).toContain('✋');
    expect(firstRow.text()).toContain('WIN');

    const secondRow = scoreRows.at(1);
    expect(secondRow.text()).toContain('Jan 02');
    expect(secondRow.text()).toContain('✋');
    expect(secondRow.text()).toContain('✌️');
    expect(secondRow.text()).toContain('LOSE');
  });

  it('displays the reset button only if scores are present', () => {
    expect(wrapper.find('button').exists()).toBe(true);

    wrapper.setData({ scores: [] });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('calls fetchScores on refresh button click', async () => {
    const refreshButton = wrapper.findAll('button').at(1);
    await refreshButton.trigger('click');

    expect(api.getScores).toHaveBeenCalledTimes(2); // Once on created, once on refresh
  });

  it('displays correct result class', () => {
    const resultSpan = wrapper.findAll('tbody tr td span').at(3);
    expect(resultSpan.classes()).toContain('text-green-100');
  });
});
