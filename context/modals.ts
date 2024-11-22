import { createDomain } from 'effector';

const modals = createDomain();

// Модалки для кошелька
export const openWalletModal = modals.createEvent();
export const closeWalletModal = modals.createEvent();

// Модалка авторизации с режимами
export const openAuthModal = modals.createEvent<{
  mode: 'login' | 'registration';
}>();
export const closeAuthModal = modals.createEvent();

// Модалка мобильного меню
export const openMobileMenu = modals.createEvent();
export const closeMobileMenu = modals.createEvent();

// Состояние модалки кошелька
export const $walletModalIsOpen = modals
  .createStore(false)
  .on(openWalletModal, () => true)
  .on(closeWalletModal, () => false);

// Состояние модалки авторизации
export const $authModalState = modals
  .createStore<{ isOpen: boolean; mode: 'login' | 'registration' }>({
    isOpen: false,
    mode: 'login', // По умолчанию открывается авторизация
  })
  .on(openAuthModal, (_, payload) => ({
    isOpen: true,
    mode: payload.mode,
  }))
  .on(closeAuthModal, (state) => ({
    ...state,
    isOpen: false,
  }));

// Для простоты доступа к состоянию открытости модалки
export const $authModalIsOpen = $authModalState.map((state) => state.isOpen);

// Для простоты доступа к текущему режиму модалки
export const $authModalMode = $authModalState.map((state) => state.mode);

// Состояние мобильного меню
export const $mobileMenuIsOpen = modals
  .createStore(false)
  .on(openMobileMenu, () => true)
  .on(closeMobileMenu, () => false);
