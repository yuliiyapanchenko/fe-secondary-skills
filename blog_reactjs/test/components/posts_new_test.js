import React from "react";
import { renderComponent, expect } from "../test_helper";
import PostsNew from "../../src/components/posts_new";
import { MemoryRouter } from "react-router-dom";

describe('PostsNew', () => {

    let component;

    beforeEach(()=> {
        const wrappedComponent = ()=> {
            return (<MemoryRouter>
                <PostsNew/>
            </MemoryRouter>)
        };

        component = renderComponent(wrappedComponent);
    });

    it('has the correct class', () => {
        expect(component).to.have.class('posts-new');
    });

    it('has a navigation tabs', () => {
        expect(component).to.contain('Posts');
        expect(component).to.contain('New Post');

        let links = component.find('a');

        expect(links).to.have.attr('href').eql('/');
    });

    it('has two input fields', () => {
        var input = component.find('input');
        expect(input).to.exist;
        expect(input.length).to.equal(2);
    });

    it('has submit button', () => {
        expect(component.find('button')).to.exist;
        expect(component.find('button')).to.have.text('Submit');
    });

    it('has cancel link', () => {
        expect(component).to.contain('Cancel');
    });
});