import { Ref, ref } from "vue";

export const useToggle = () => {
  const toggleState: Ref<boolean> = ref(false);

  const changeToggleState = (): void => {
    toggleState.value = !toggleState.value;
  };

  const closeToggle = (): void => {
    toggleState.value = false;
  };

  return { toggleState, changeToggleState, closeToggle };
};
