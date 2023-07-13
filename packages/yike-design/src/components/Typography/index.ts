import OriginTypography from './Typography';
import Title from './Title';
import Text from './Text';
import Paragraph from './Paragraph';
import './style';

const Typography = OriginTypography as typeof OriginTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
};

Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;

export default Typography;
