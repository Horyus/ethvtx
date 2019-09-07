import { State }                    from '../state';
import { VtxconfigAllowedNetworks } from '../state/vtxconfig';

export interface VtxConfigArguments {
    poll_timer?: number;
    confirmation_threshold?: number;
    allowed_nets?: VtxconfigAllowedNetworks;
}

export const configureVtx = <T extends State = State>(initialState: T, config: VtxConfigArguments): T =>
    ({
        ...initialState,
        vtxconfig: {
            ...initialState.vtxconfig,
            poll_timer: config.poll_timer || initialState.vtxconfig.poll_timer,
            confirmation_threshold: config.confirmation_threshold || initialState.vtxconfig.confirmation_threshold,
            allowed_nets: config.allowed_nets || initialState.vtxconfig.allowed_nets
        }
    });
