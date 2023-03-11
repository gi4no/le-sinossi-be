/*
 *
 * HomePage
 *
 */

import React, { useCallback, useState } from "react";
import pluginId from "../../pluginId";

import {
  Button,
  Box,
  BaseHeaderLayout,
  Dialog,
  ContentLayout,
  Typography,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Flex,
  DialogFooter,
  Stack,
  DialogBody,
} from "@strapi/design-system";
import { Trash, ExclamationMarkCircle } from "@strapi/icons";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import scrapeRequest from "../../api/scraper";

const HomePage: React.FunctionComponent = () => {
  const [data, setData] = useState<null | Record<string, string>[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const COL_COUNT = 4;

  const onFetchScrape = useCallback(() => {
    setIsLoading(true);
    scrapeRequest.getScrapeResult().then((resp) => {
      setData(resp.data.result as Record<string, string>[]);
      setIsLoading(false);
    });
  }, []);

  const onAdd = useCallback(() => {
    setIsLoading(true);
    scrapeRequest.saveScrapeResult(data).then((resp) => {
      setData(null);
      setIsLoading(false);
    });
  }, [data]);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    scrapeRequest.deleteScrapeResult().then(() => {
      setIsLoading(false);
      setVisibleDelete(false)
    });
  }, []);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Box>
      <BaseHeaderLayout
        title="Scrape film"
        subtitle="plugin for scrape film data"
        as="h2"
      />
      <ContentLayout>
        <Flex gap={4}>
          <Button onClick={onFetchScrape} disabled={!!data}>Scrape</Button>
          <Button onClick={onAdd}>Add</Button>
          <Button onClick={() => setVisibleDelete(true)}>Delete</Button>
        </Flex>
      </ContentLayout>
      <ContentLayout>
        {data && (
          <Table
            colCount={COL_COUNT}
            rowCount={data.length}
            style={{ whiteSpace: "unset" }}
          >
            <Thead>
              <Tr>
                {Object.keys(data[0]).map((el) => (
                  <Th>
                    <Typography variant="sigma">{el}</Typography>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ image, title, description, trama }) => (
                <Tr key={title}>
                  <Td>
                    <Typography>
                      <img src={image} style={{ width: 100 }} />
                    </Typography>
                  </Td>
                  <Td>
                    <Typography>{title}</Typography>
                  </Td>
                  <Td>
                    <Typography>{description}</Typography>
                  </Td>
                  <Td>
                    <Typography>{trama}</Typography>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </ContentLayout>
      <Dialog
        onClose={() => setVisibleDelete(false)}
        title="Confirmation"
        isOpen={visibleDelete}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Stack spacing={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to delete this?
              </Typography>
            </Flex>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setVisibleDelete(false)} variant="tertiary">
              Cancel
            </Button>
          }
          endAction={
            <Button
              variant="danger-light"
              onClick={onDelete}
              startIcon={<Trash />}
            >
              Confirm
            </Button>
          }
        />
      </Dialog>
    </Box>
  );
};

export default HomePage;
