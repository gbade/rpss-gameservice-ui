import { shallowMount } from '@vue/test-utils';
import GameComponent from '@/components/GameComponent.vue';
import api from '@/api';

jest.mock('@/api');

describe('GameComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GameComponent);
  });

  it('fetches choices on created', async () => {
    const choices = [
      { id: 1, name: 'Rock' },
      { id: 2, name: 'Paper' },
    ];
    api.getChoices.mockResolvedValue(choices);

    await wrapper.vm.fetchChoices();

    expect(wrapper.vm.choices).toEqual(choices);
  });

  it('plays game and sets result', async () => {
    const result = {
      result: 'win',
      player: 1,
      computer: 2,
    };
    api.playGame.mockResolvedValue(result);

    await wrapper.vm.playGame(1);

    expect(wrapper.vm.result).toEqual(result);
  });

  it('renders choices correctly', async () => {
    const choices = [
      { id: 1, name: 'Rock' },
      { id: 2, name: 'Paper' },
    ];
    wrapper.setData({ choices });

    await wrapper.vm.$nextTick();

    const choiceButtons = wrapper.findAll('button');
    expect(choiceButtons.length).toBe(choices.length);
    expect(choiceButtons.at(0).text()).toContain('Rock');
    expect(choiceButtons.at(1).text()).toContain('Paper');
  });
});
