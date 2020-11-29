import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const FavoriteItem = styled.View`
    height: auto;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* background-color:  */
`

export const FavoriteImage = styled.Image`
    /* width: 100px;
    height: 100px; */
    height: 75px;
    width: 50px;

`

export const FavoriteDetails = styled.View`
    justify-content: center;
    margin-left: 10px;
`

export const FavoriteTitle = styled.Text`
    font-size: 14px;
    font-weight: 700;
`

export const NoFavoritesText= styled.Text`
    flex: 1;
    text-align: center;
    text-align-vertical: center;
    font-size: 14px;
`