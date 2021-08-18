import {
  Action,
  ActionOn,
  Actions,
  Computed,
  Listeners,
  State,
  Thunk,
} from 'easy-peasy';

type AliasedAction<Model extends object, T> = Action<Model, { id: T }>;

type AliasedThunk<Model extends object, T> = Thunk<Model, { id: T }>;

type AliasedComputed<Model extends object, T> = Computed<Model, { id: T }>;

interface NestedModel {
  action: Action<MyModel, string[] | null>;
  thunk: Thunk<NestedModel, string>;
  computed: Computed<MyModel, number>;
  aliasedAction: AliasedAction<MyModel, string>;
  listener: ActionOn<MyModel>;
}

interface MyModel {
  action: Action<MyModel, string[] | null>;
  aliasedAction: AliasedAction<MyModel, string>;
  nestedModel: NestedModel;
  aliasedThunk: AliasedThunk<MyModel, object>;
  aliasedComputed: AliasedComputed<MyModel, number>;
  listener: ActionOn<MyModel>;
  computed: Computed<MyModel, number>;
  state: number;
}

type ActionsInMyModel = Actions<MyModel>;

type ListenersInMyModel = Listeners<MyModel>;

type StateInMyModel = State<MyModel>;

const assertActions = {} as ActionsInMyModel;

assertActions.action;
assertActions.aliasedAction;
assertActions.aliasedThunk;
assertActions.nestedModel.action;
assertActions.nestedModel.aliasedAction;
assertActions.nestedModel.action;
// typings:expect-error
assertActions.computed;
// typings:expect-error
assertActions.nestedModel.computed;
// typings:expect-error
assertActions.aliasedComputed;

const assertState = {} as StateInMyModel;

assertState.state;
assertState.computed;
assertState.aliasedComputed;
// typings:expect-error
assertState.aliasedAction;
// typings:expect-error
assertState.action;

const assertListeners = {} as ListenersInMyModel;

assertListeners.nestedModel;
assertListeners.listener;
assertListeners.nestedModel.listener;
// typings:expect-error
assertListeners.aliasedAction;
// typings:expect-error
assertListeners.action;
// typings:expect-error
assertListeners.state;
// typings:expect-error
assertListeners.computed;
