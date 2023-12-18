import { createAction, props } from '@ngrx/store';
export const SHOW_ALERT = '[app event] show alert'
export const EMPTY_ACTION = '[app event] empty'

export const EmptyAction = createAction(EMPTY_ACTION)
export const showAlert = createAction(SHOW_ALERT,props<{message:string}>())