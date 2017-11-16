import React from "react";
import { renderComponent, expect } from "../test_helper";
import PostsNav from "../../src/components/posts_nav";
import { MemoryRouter } from "react-router-dom";

describe('PostsNav', () => {

    let component;

    beforeEach(()=> {
        const wrappedComponent = ()=> {
            return (<MemoryRouter>
                <PostsNav/>
            </MemoryRouter>)
        };

        component = renderComponent(wrappedComponent);
    });

    it('has the correct class', () => {
        expect(component).to.have.class('posts-nav');
        expect(component).to.have.class('nav-tabs');
        expect(component).to.have.class('nav');
    });

    it('has a correct links', () => {
        expect(component).to.contain('Posts');
        expect(component).to.contain('New Post');

        let links = component.find('a');

        expect(links.length).to.equal(2);
        expect(links).to.have.attr('href').eql('/');
    });

});