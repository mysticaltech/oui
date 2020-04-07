import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Accordion, AccordionSection } from '../Accordion';
import Attention from '../Attention';

const stories = storiesOf('Accordion', module);
stories.addDecorator(withKnobs).addDecorator(story => (
  <div id="root-preview">
    <div className="push-double--bottom">
      <Attention type="bad-news" alignment="center">
        <p>
          <strong>Deprecated: </strong>Accordion is deprecated. If you think you
          need to use this component, please reach out to the OUI reps.
        </p>
      </Attention>
    </div>
    {story()}
  </div>
));

stories
  .add('Single Section Accordion', () => {
    return (
      <div className="height--300">
        <Accordion>
          <AccordionSection title={ 'Section 1' }>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              lobortis pellentesque justo vel rutrum. Proin aliquam, sem in
              ullamcorper dignissim, enim sem maximus metus, quis malesuada
              massa diam non urna. Fusce erat massa, cursus at ex sit amet,
              tristique bibendum ipsum. Mauris porttitor augue quis leo
              ultricies, quis volutpat turpis tempus. Nullam interdum
              condimentum elit sed volutpat. Donec dictum augue sed arcu mollis,
              vel tincidunt purus mattis. Sed vitae dui nec turpis lobortis
              pretium non quis risus. Donec lacus lectus, commodo a diam sit
              amet, congue molestie mauris. Sed quis elit pulvinar, maximus nisl
              ac, vulputate velit. Etiam pretium libero nibh, nec accumsan metus
              elementum in. Pellentesque convallis enim felis, id congue orci
              tincidunt vitae. Maecenas maximus, augue ut venenatis fringilla,
              massa tortor luctus dolor, non vestibulum enim lectus eu quam.
              Etiam sagittis sapien at urna sollicitudin finibus.
            </p>
            <p>
              Maecenas feugiat elit et convallis consequat. Pellentesque eu
              aliquam elit. Vivamus porta dui sit amet justo tincidunt laoreet.
              Sed sodales posuere dolor, et maximus tortor molestie sed. Nullam
              ac tincidunt lorem. Nullam orci mauris, ultricies sed erat eget,
              euismod aliquet sapien. Nam ornare ipsum sit amet pellentesque
              mattis. Quisque erat turpis, malesuada vel faucibus eget,
              fringilla et nibh. Praesent bibendum feugiat libero quis
              tincidunt. Sed consectetur massa vel metus luctus, ac cursus
              tellus auctor.
            </p>
            <p>
              Ut vehicula, ex quis auctor efficitur, nunc quam porta ligula,
              quis egestas dolor ante nec nibh. Nam vel tincidunt tortor, quis
              fermentum est. Suspendisse dignissim pretium quam quis eleifend.
              Mauris consequat sagittis orci at lacinia. Vivamus ex massa,
              blandit eget malesuada at, tincidunt vitae ipsum. Quisque vel
              neque diam. Nullam vel tortor elit. Proin porttitor gravida magna,
              dapibus pharetra nisl. Nulla commodo enim at cursus finibus. Cras
              ac ipsum pellentesque, mattis ante non, rutrum lacus.
            </p>
            <p>
              Ut faucibus lorem eros, eu consectetur ex bibendum ac. Morbi
              commodo tincidunt luctus. Pellentesque blandit efficitur nibh.
              Suspendisse scelerisque interdum mi, at tempor neque laoreet nec.
              Sed at viverra enim. Quisque nisl nisi, suscipit dictum ipsum ac,
              egestas imperdiet odio. Fusce aliquam convallis turpis sed
              gravida. Vivamus metus orci, luctus nec dolor lacinia,
              sollicitudin lacinia tortor. Proin maximus, massa a feugiat
              ultricies, ipsum diam pulvinar nibh, eu dapibus ante sem sed
              apien. Vivamus tempus erat a turpis mattis, ac sodales sem varius.
              Nulla eleifend velit id euismod dictum. Nulla facilisi. Integer
              varius tortor nulla, ornare pellentesque eros sagittis eget.
            </p>
            <p>
              In id blandit mauris, sed tincidunt neque. Morbi at pellentesque
              dolor. Nullam dictum nisl ac nibh consectetur gravida ut sed arcu.
              Nulla maximus justo nec elit sodales, sed elementum turpis
              tristique. Ut eget nibh nunc. Donec tincidunt elementum fermentum.
              Mauris a feugiat massa.
            </p>
          </AccordionSection>
        </Accordion>
      </div>
    );
  })
  .add('Multi-Section Accordion', () => {
    return (
      <div className="height--300">
        <Accordion>
          <AccordionSection title={ 'Section 1' }>
            This is the body of section 1
          </AccordionSection>
          <AccordionSection title={ 'Section 2' }>
            This is the body of section 2
          </AccordionSection>
        </Accordion>
      </div>
    );
  });
