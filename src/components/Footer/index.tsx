import { StyledFooter, A, Section } from "./styles";

export const Footer = () => {
  return (
    <StyledFooter>
      <Section>
        <span>The data is provided by </span>
        <A href="https://data.covid19india.org/" target="_blank">
          https://data.covid19india.org/
        </A>
      </Section>
      <Section>
        <span>Check the source code at </span>
        <A href="https://github.com/il3ven/ETA-for-vaccination" target="_blank">
          GitHub
        </A>
        <span> or </span>
        <A href="mailto:8e023sxup@relay.firefox.com" target="_blank">
          Email us
        </A>
        <img src="https://email.codedump.xyz/goto/41" alt=''/>
      </Section>
    </StyledFooter>
  );
};
