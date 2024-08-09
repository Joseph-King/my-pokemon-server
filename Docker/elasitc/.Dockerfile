FROM docker.elastic.co/elasticsearch/elasticsearch:8.9.0

ENV discovery.type=single-node
ENV xpack.security.enabled=true

EXPOSE 9200

RUN bin/elasticsearch-users useradd kibana -p kibana -r kibana_system