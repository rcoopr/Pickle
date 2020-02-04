import 'styled-components';
import { ITheme } from 'theme';

declare module 'styled-components' {
  interface DefaultTheme extends ITheme {}
}
