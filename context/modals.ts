import { createDomain } from 'effector';

const modals = createDomain();

export const openWalletModal = modals.createEvent();
export const closeWalletModal = modals.createEvent();

export const openAuthModal = modals.createEvent();
export const closeAuthModal = modals.createEvent();

export const openMobileMenu = modals.createEvent();
export const closeMobileMenu = modals.createEvent();

export const $walletModalIsOpen = modals
  .createStore(false)
  .on(openWalletModal, () => true)
  .on(closeWalletModal, () => false);

export const $authModalIsOpen = modals
  .createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);

export const $mobileMenuIsOpen = modals
  .createStore(false)
  .on(openMobileMenu, () => true)
  .on(closeMobileMenu, () => false);
