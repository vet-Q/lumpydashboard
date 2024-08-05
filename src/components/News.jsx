import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Card, CardContent, CardMedia, Button } from '@mui/material';

async function fetchLocalNews() {
    const response = await fetch('/data/news.json');
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.articles; // articles 배열을 반환
}

function Item({ item }) {
    const theme = useTheme();
    const colors = {
        background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
        text: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[800]
    };

    const formattedDate = new Date(item.publishedAt).toLocaleDateString();

    return (
        <Card sx={{ display: 'flex', mb: 2, backgroundColor: colors.background }}>
            <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={item.urlToImage || 'https://via.placeholder.com/160'}
                alt={item.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
                <CardContent>
                    <Typography variant="h5" color={colors.text}>
                        {item.title} <span style={{ fontSize: '0.8em', color: colors.text }}>{formattedDate}</span>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {item.description}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read more
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}

function News() {
    const [list, setList] = useState(null);

    useEffect(() => {
        fetchLocalNews().then(setList).catch(console.error);
    }, []);

    return (
        <Box className="news" p={2}>
            {!list ? null : list.length === 0 ? (
                <Typography><i>No results</i></Typography>
            ) : (
                <Box>
                    {list.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default News;
