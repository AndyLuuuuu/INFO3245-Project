import styled from 'styled-components';


export const Container = styled.View`
    flex: 1;
    background-color: black;
`

export const ImageContainer = styled.View`
    flex: 0.7;
`

export const BackdropImage = styled.Image`
    position: relative;
    height: 100%;
`

export const PosterImage = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const Content = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'center'
    }
}))`
    flex: 0.3;
    padding: 20px;
`

export const Title = styled.Text`
    color: rgba(175, 175, 175, 1);
    font-size: 15px;
    font-weight: 700;
    margin-top: 5px;

`

export const Text = styled.Text`
    color: white;
    font-size: 15px;
`