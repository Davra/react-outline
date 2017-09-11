
import React from 'react';
import faker from 'faker';
import outline, { withOptions, setOptions } from "react-outline"
import { Styles } from 'react-outline'
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function classNameGen(){
  return faker.internet.userName()
}

describe('With Options at style level', () => {
    it('Not passing a options object should throw', () => {
      expect(() => {
        withOptions()
      }).toThrow();
    })

    it('Using options to set color short-hand', () => {

        const custom_outline =  withOptions({colors:{primary:"#ABC123"}})

        const fooN = classNameGen();
        const barN = classNameGen();

        const css = {
            base : {
                 [fooN]:{  color:"primary" },
                 [barN]:{  color:"red" }
            }
        }
        const styles = custom_outline(css);

        const foo = shallow(<div style={styles[fooN]()}/>);
        const bar = shallow(<div style={styles[barN]()}/>);

        expect(bar.prop("style")).toEqual({  color:"red" })
        expect(foo.prop("style")).toEqual({  color:"#ABC123" })
    })

    it('Using options to set caching (base + fn)', () => {

        const custom_outline =  withOptions({caching:true})

        const color = randomColor();
        const barN = classNameGen();

        const css = {
            base:{[barN]:{backgroundColor:"yellow"}},
                  //  USE a random color
            [barN] : ()=>({color})
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(css[barN]()).not.toBe(css[barN]());
        expect(baz1.prop("style")).toHaveProperty("color");
        expect(baz1.prop("style").color).toEqual(color);
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })

    it('Using options to set caching (base)', () => {

        const custom_outline =  withOptions({caching:true})
        const barN = classNameGen();

        const css = {
            base:{[barN]:{color:"white"}},
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(css.base[barN]).toEqual(styles[barN]());
        expect(baz1.prop("style")).toHaveProperty("color")
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })

    it('Using options to set caching (fn)', () => {

        const custom_outline =  withOptions({caching:true})
        const barN = classNameGen();

        const css = {
              //  USE a random color
              [barN] : ()=>({color:randomColor()})
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(baz1.prop("style")).toHaveProperty("color")
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })
})

describe('In production mode', () => {

      beforeAll(() => global.__TEST__ = false);
      afterAll( () => global.__TEST__ = true);

      it('should throw if no style values are passed', () => {
        expect(() => {
          styles = outline();
        }).toThrow();
      })

      it('should throw if a style value is not object or function', () => {
        expect(() => {
          styles = outline({[classNameGen()]:classNameGen()}); // random name with random value
        }).toThrow();
      })

      it('generated elements using CSS features need a unique class', () => {

        const titleN = classNameGen();

            let styles = {
                base : {
                  [titleN]:{
                     base:{     background: "lightblue", color:"black" },
                    ":hover":{  background: "darkblue" , color:"white" }
                  }
                }
            }
            styles = outline(styles);

            const Title = styles[titleN]`div`

            const elem = shallow(<Title/>);
            expect(elem.prop("className")).toMatch(/^react-outline-[a-zA-Z0-9]{10}$/)
      })

      it('should run style function once if cased and same input', () => {
          let callCount = 0;
          let styles = {
            crazyElem : (x)=> callCount++
          };
          styles = outline(styles,{caching:true}); // random name with random value

          styles.crazyElem(5);
          styles.crazyElem(5);

          expect(callCount).toEqual(1);
      })

      it('should be able to pass an value to style logic', () => {
          const css = {    };
          const logic = { dogs: val => ({ color: "string" === typeof val ? "white" : "black" }) };
          const styles = outline(css,logic); // random name with random value

          const Dogs = styles.dogs`div`;
          expect(renderer.create(<Dogs style={"boo"} />).toJSON()).toMatchSnapshot();
          expect(renderer.create(<Dogs style={7}     />).toJSON()).toMatchSnapshot();
      })

      it('should be able to destructur assignments on generated element', () => {
          const css = {    };
          const logic = { cats: ({number})=> ({ color: number > 5 ? "blue" : "pink" }) };
          const styles = outline(css,logic); // random name with random value

          const Cats = styles.cats`div`;
          expect(renderer.create(<Cats style={{number:2}} />).toJSON()).toMatchSnapshot();
          expect(renderer.create(<Cats style={{number:7}} />).toJSON()).toMatchSnapshot();
      })

      it('should be able to pass true value', () => {
          const css = {
            input : {
              base:{color: "red"},
              big:{fontSize: "20px"}
            }
          };
          const logic = { input: ()=> ({ background: "gray" }) };
          const styles = outline(css,logic); // random name with random value

          const Input = styles.input``;
          expect(renderer.create(<Input big disabled />).toJSON()).toMatchSnapshot();
      })
/*
      it('should skip unknown css props', () => {
          let styles = {
            niceElem : {
                base  :{color:"black" },
              ":hover":{color:"gray"},
              "~touch":{color:"boo!"}
            }
          };
          styles = outline(styles); // random name with random value
      })*/
})

describe('Check setOptions', () => {

    it('should throw no options are passed', () => {
      expect(() => {
        setOptions();
      }).toThrow();
    })

    it('should allow dev to set custom colours', () => {
      const colors = {crazyRed:"RED!"};
      expect(outline.colors).toBeUndefined();
      setOptions({colors:{crazyRed:"RED!"}});
      expect(outline.colors).toEqual(colors);
    })
})