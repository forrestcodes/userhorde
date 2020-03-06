export const setHeaders = () => {
  return { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
};