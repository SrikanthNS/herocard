/**
 * Imports
 */
import AuthActions from './auth';
import UserInputActions from './user-input';
import DirectActions from './direct';
import ToggleCardViewActions from './toggle-card';
import ActionCompletionActions from './action-completion';
import CommonActions from './common';

/**
 * HeroCardActions
 */
const HeroCardActions = {
    Auth: AuthActions,
    UserInput: UserInputActions,
    Direct: DirectActions,
    ToggleCardView: ToggleCardViewActions,
    ActionCompletion: ActionCompletionActions,
    Common: CommonActions
};

/**
 * Exports
 */
export default HeroCardActions;